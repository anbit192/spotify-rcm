from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
import pickle
from pathlib import Path
import os
from .test.get_audio_feature import get_feature
from fastapi import FastAPI
from pydantic import BaseModel

cwd = Path(os.getcwd())
model_path = cwd / "models"

with open(model_path / "pca.pickle", "rb") as f:
    pca: PCA = pickle.load(f)

with open(model_path / "scaler.pickle", "rb") as f:
    scaler: StandardScaler = pickle.load(f)

with open(model_path / "kmean.pickle", "rb") as f:
    k_mean: KMeans = pickle.load(f)












