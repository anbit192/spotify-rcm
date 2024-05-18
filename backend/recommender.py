from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
import pickle
from pathlib import Path
import os
import faiss

cwd = Path(os.getcwd())
model_path = cwd / "models"

with open(model_path / "pca.pickle", "rb") as f:
    pca_pretrained: PCA = pickle.load(f)

with open(model_path / "scaler.pickle", "rb") as f:
    scaler_pretrained: StandardScaler = pickle.load(f)

with open(model_path / "kmean.pickle", "rb") as f:
    k_mean_pretrained: KMeans = pickle.load(f)



recommender_instance = None
def get_instance():
    global recommender_instance
    if (recommender_instance is None):
        recommender_instance = Recommender()

    return recommender_instance

class Recommender:
    def __init__(self):
        self.df = pd.read_csv(cwd / "processed_data.csv").iloc[:, 1:].drop(columns=["audio_feats_key", "audio_feats_mode", "audio_feats_time_signature"])
        self.df_labels = self.df["label"]

        self.k_mean = k_mean_pretrained
        self.pca = pca_pretrained
        self.scaler = scaler_pretrained

        self.transformed_data = self.pca.transform(self.scaler.transform(self.df.iloc[:, 3:-1]))


    def get_k_closest(self, transformed_input, data, k):
        
        # Chuẩn hóa các vector thành độ dài 1
        normalized_input = transformed_input / np.linalg.norm(transformed_input)
        normalized_compare = data / np.linalg.norm(data, axis=1)[:, np.newaxis]

        # Xây dựng chỉ số Faiss
        index = faiss.IndexFlatIP(data.shape[1])  # vector_compare.shape[1] là số chiều của vector
        index.add(normalized_compare)

        num_neighbors = k + 1  # Số lượng hàng xóm gần nhất cần tìm

        # Tìm kiếm hàng xóm gần nhất
        distances, indices = index.search(np.array([normalized_input]), k=num_neighbors)

        return distances[0], indices[0]
    

    def get_recommendation_ID(self, input_vector, k=20):
        
        transformed_input = self.pca.transform(self.scaler.transform([input_vector])).flatten()
        pred_label = self.k_mean.predict([transformed_input])[0]

        grouped_data = self.transformed_data[self.df_labels.to_numpy() == pred_label]
        grouped_ID = self.df["ID"].to_numpy()[self.df_labels.to_numpy() == pred_label]

        dist, idxs = self.get_k_closest(transformed_input, grouped_data, k)
        dupp_idx = np.where(dist[0] == 1)[0]
        if (len(dupp_idx) >= 1):
            idxs = np.delete(idxs, dupp_idx)
            
        return {"id":list(grouped_ID[idxs][:k])}


def main():
    test_input = np.array([ 6.89000e-01,  2.68000e-01, -1.57220e+01,  5.05000e-01,9.23000e-01,  1.69000e-06,  3.10000e-01,  5.69000e-01,1.21202e+02,  9.10630e+04])
    
    rcm = get_instance()
    print(rcm.get_recommendation_ID(test_input, 10))
    # print(test_input)

if __name__ == "__main__":
    main()










        










