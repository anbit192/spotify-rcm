from pydantic import BaseModel
from fastapi import FastAPI, status
from typing import List
import recommender

app = FastAPI()

class AudioFeatures(BaseModel):
    acousticness : float
    danceability : float
    duration_ms : float
    energy : float
    instrumentalness : float
    key : int
    liveness : float
    loudness : float
    mode : int
    speechiness : float
    tempo : float
    time_signature : int
    valence : float

class TrackID(BaseModel):
    id : str

class TrackInfos(BaseModel):
    id : str
    artist : str
    track_name : str

@app.get("/recommend", response_model=AudioFeatures, status_code=status.HTTP_200_OK)
async def get_recommended_tracks(input_track_feats: AudioFeatures):
    """
    Hàm nhận features 1 bài nhạc để nhận lại IDs đề xuất của các bài nhạc khác
    Status code:
    - 201: Thành công.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    return recommender.get_recommendations_IDs(input_track_feats)

@app.get("/{id}", response_model=TrackInfos, status_code=status.HTTP_200_OK)
async def get_tracks_infos_id(input_id: TrackID):
    """
    Hàm nhận id 1 bài nhạc để nhận lại thông tin bài nhạc đó gồm track_name và artist
    Status code:
    - 201: Thành công.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    return recommender.get_tracks_infos(input_id)