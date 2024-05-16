import pickle
import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time
from dotenv import load_dotenv
import os
from spotipy.exceptions import SpotifyException

def get_feature():

    with open("unique_track.pickle", "rb") as f:
        track_infos = pickle.load(f)

    load_dotenv()

    os.environ["CLIENT_ID"] = "25720071095d4951be0ac812ed09f1a6"
    os.environ["CLIENT_SECRET"] = "ea6ee7130c6e4e8b99d918c0c179e78e"

    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")

    cli_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=cli_credentials_manager)

    invalid_tracks = []

    keys = list(track_infos.keys())

    def get_and_update_feats(batch_ids: list):
        unneccesary_feats = ["id", "uri", "track_href", "analysis_url", "type"] # Unneccesary features
        feature_list = sp.audio_features(batch_ids)
        
        for i, feats in enumerate(feature_list, start=0):
            if (feats is None):
                invalid_tracks.append(batch_ids[i])
                print(f"Track with ID {batch_ids[i]}'s features is None")
                continue
            
            id = batch_ids[i]
            for feat in unneccesary_feats: # Remove unnecessary features
                feats.pop(feat, None)
        
            temp = {
                "audio_feats":feats
            }

            track_infos[id].update(temp)

    def update_with_batch(start_index, end_index, keys, batch_size: int = 100):
        # max_size = end_index
        i = start_index
        while (True):
            print(f"Current tracks updated: {i}")
            
            if (i >= end_index):
                i = end_index - batch_size - 1
                # print("Here: ", i)


            batch = keys[i:i+batch_size]
            get_and_update_feats(batch)
            
            time.sleep(2)

            if (i == end_index - 1):
                break
            
            i += batch_size

    
        
        
