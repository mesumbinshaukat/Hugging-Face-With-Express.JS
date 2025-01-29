from transformers import pipeline
import sys

def generate_text(prompt, model_name):
    generator = pipeline('text-generation', model=model_name)
    generated_text = generator(prompt, max_length=100)[0]['generated_text']
    print(generated_text)

if __name__ == "__main__":
    prompt = sys.argv[1]
    model_name = sys.argv[2]
    generate_text(prompt, model_name)