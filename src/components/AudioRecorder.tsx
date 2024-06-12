export const startRecording = (audioChunks) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.start();
      window.mediaRecorder = mediaRecorder;
    });
  };
  
  export const stopRecording = (audioChunks) => {
    return new Promise((resolve) => {
      window.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        resolve(audioBlob);
      };
      window.mediaRecorder.stop();
    });
  };
  