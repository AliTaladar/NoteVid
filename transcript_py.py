from youtube_transcript_api import YouTubeTranscriptApi
from GPTIntegration import summarizer

import tkinter as tk

def display_text():
    video_id = entry.get()

    MAXCHARCOUNT = 295

    ytscript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'fr'])

    script_arrayy = [i['text'] for i in ytscript]

    n = len(script_arrayy)

    #put as many elements from the array on a line in under 300 chars
    i = 0
    cntt = 0
    while i < n:
        j = 1
        cnt = len(script_arrayy[i])
        while i+j < n and cnt + len(script_arrayy[i+j]) < MAXCHARCOUNT:
            cnt += len(script_arrayy[i+j])
            script_arrayy[i] += " " + script_arrayy[i+j]
            script_arrayy[i+j] = None
            j += 1
        cntt += 1
        i += j

    script_array = ["" for i in range(cntt)]
    j = 0

#https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
#https://platform.openai.com/docs/guides/rate-limits?context=tier-free

    for i in script_arrayy:
        if i != None:
            script_array[j] = i
            j += 1

# ** PRINT NUMBER OF CHARACTERS IN EACH REQUEST**

    video_summary = summarizer(script_array)


    result_label.config(text=f"{video_summary}")

window = tk.Tk()
window.title("Simple GUI")

instruction_label = tk.Label(window, text="Enter video link:")
instruction_label.pack(pady=10)

entry = tk.Entry(window)
entry.pack(pady=10)

submit_button = tk.Button(window, text="Submit", command=display_text)
submit_button.pack(pady=10)

result_label = tk.Label(window, text="")
result_label.pack(pady=10)

window.mainloop()