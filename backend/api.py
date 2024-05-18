from pydantic import BaseModel
from fastapi import FastAPI, status
from typing import List
import recommender
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class AudioFeatures(BaseModel):
    acousticness: float
    danceability: float
    duration_ms: float
    energy: float
    instrumentalness: float
    key: int
    liveness: float
    loudness: float
    mode: int
    speechiness: float
    tempo: float
    time_signature: int
    valence: float


class TrackID(BaseModel):
    id: list


class TrackInfos(BaseModel):
    id: str
    artist: str
    track_name: str

def process_json_input(input_track_feats):
    dict = input_track_feats.dict()
    drops = ["key", "mode", "time_signature"]
    for key in drops:
        dict.pop(key, None)
    print(dict)
    input_vector = [dict[key] for key in dict.keys()]

    return input_vector


@app.post("/recommend", response_model=TrackID, status_code=status.HTTP_200_OK)
async def get_recommended_tracks(input_track_feats: AudioFeatures):
    """
    Hàm nhận features 1 bài nhạc để nhận lại IDs đề xuất của các bài nhạc khác
    Status code:
    - 200: Thành công.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    input_vector = process_json_input(input_track_feats)
    return recommender.get_instance().get_recommendation_ID(input_vector)


@app.get("/{id}", response_model=TrackInfos, status_code=status.HTTP_200_OK)
async def get_tracks_infos_id(input_id: TrackID):
    """
    Hàm nhận id 1 bài nhạc để nhận lại thông tin bài nhạc đó gồm track_name và artist
    Status code:
    - 200: Thành công.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    return recommender.get_tracks_infos(input_id)
