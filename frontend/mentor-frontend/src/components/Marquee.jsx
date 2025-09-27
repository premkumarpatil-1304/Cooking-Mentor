import React from 'react'
import { motion } from 'framer-motion'

function Marquee() {
    return (
        <div className='w-full py-8  bg-[#6DBE45] overflow-hidden'>
            <div className="text border-t-2 border-b-2 flex gap-10 whitespace-nowrap border-white relative">
                <motion.div
                    className="flex gap-10"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        ease: "linear",
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{ width: 'max-content' }}
                >
                    <h1 className='text-[8vw]  uppercase text-white -mb-0 font-bold'>Learn to cook here</h1>
                    <h1 className='text-[8vw]  uppercase text-white -mb-0 font-bold'>We are here to teach you </h1>
                </motion.div>
            </div>
        </div>
    )
}

export default Marquee
