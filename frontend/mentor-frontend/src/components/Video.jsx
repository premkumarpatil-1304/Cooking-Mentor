import React from 'react'
import heroVideo from '../assets/Hero_Video.mp4'

function Video() {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden position-relative shadow-3g">
            <video
                className='w-full h-full object-cover'
                autoPlay
                muted
                loop
                playsInline
                src={heroVideo}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Video