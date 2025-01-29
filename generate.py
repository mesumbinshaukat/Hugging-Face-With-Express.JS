# from transformers import pipeline
# import sys

# def generate_text(prompt, model_name):
#     generator = pipeline('text-generation', model=model_name, device=-1)
#     generated_text = generator(prompt, max_length=100)[0]['generated_text']
#     print(generated_text)  # Ensure output

# if __name__ == "__main__":
#     prompt = sys.argv[1]
#     model_name = sys.argv[2]
#     output = generate_text(prompt, model_name)
#     print(output)  # Ensure it prints something


from transformers import pipeline

# Load once at script startup
generator = pipeline('text-generation', model='gpt2', device=-1)

def generate_text(prompt):
    return generator(prompt, max_length=100)[0]['generated_text']

if __name__ == "__main__":
    import sys
    prompt = sys.argv[1]
    print(generate_text(prompt))