/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export namespace File {
  export const getVideoCover = async (file: File, seekTo: number = 0): Promise<Blob> => {
    /**
         * Get File Thumbnail
         * @param {File} file
         * @return {string} file thumb
         */
    return await new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement('video')
      videoPlayer.setAttribute('src', URL.createObjectURL(file))
      videoPlayer.load()
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject(new Error('video is too short.'))
          return
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo || videoPlayer.duration / 4
        }, 200)
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener('seeked', () => {
          console.log('video is now paused at %ss.', seekTo)
          // define a canvas to have the same dimension as the video
          const canvas = document.createElement('canvas')
          canvas.width = videoPlayer.videoWidth
          canvas.height = videoPlayer.videoHeight
          // draw the video frame to canvas
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height)
          // return the canvas image as a blob
          ctx?.canvas.toBlob(
            blob => {
              resolve(blob as Blob)
            },
            'image/jpeg',
            0.75 /* quality */
          )
        })
      })
    })
  }
}
