from nsfw_detector import predict

model = predict.load_model('./mobilenet_v2_140_224')
predict.classify(model, '/test.jpg')