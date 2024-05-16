from sklearn.neighbors import KDTree

def get_top10_neighborest(vector_input, vector_compare):

    kdtree = KDTree(vector_compare)

    num_neighbors = 10  # Số lượng hàng xóm gần nhất cần tìm

    distances, indices = kdtree.query([vector_input], k=num_neighbors, return_distance=True)

    return distances, indices