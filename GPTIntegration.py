from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def summarizer(array):
    """
    Summarizes an array of text through ChatGPT

    Parameters:
        array (list): list of lines seperated of under length 300 chars as to avoid
        ChatGPT's API input limit
    
    Returns:
        assistant_reply (string): Summarized transcript of video by ChatGPT
    """
    conversation_history = []

    for line in array:
        #feed a transcript bigger than chatgpt can handle in a single prompt, over multiple prompts
        if line != array[-1]:
            conversation_history.append({"role": "user", "content": "This is a line apart of a long text, and there is more coming: " + line})
            response = client.chat.completions.create(
            model = "gpt-4-1106-preview",
            #give an empty history, to reduce time complexity
            messages = [{"role": "user", "content": "Do nothing"}],
            max_tokens = 10,
        )
        
        #only at the last line
        else:
            conversation_history.append({"role": "user", "content": "Using the text in conversation_history, make an educational summary in 500 words" + line})
            response = client.chat.completions.create(
            model = "gpt-4-1106-preview",
            messages = conversation_history,
            max_tokens = 682, # limit of ~500 words
        )


        assistant_reply = response.choices[0].message.content

        #will eventually get to the last line
        if line == array[-1]:
            return assistant_reply


        conversation_history.append({"role": "assistant", "content": assistant_reply})