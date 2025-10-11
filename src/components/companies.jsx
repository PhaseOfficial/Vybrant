import React from 'react';
import ScrollFloat from './ScrollFloat';

// Add more logos as needed

const LogoMarquee = () => {
  return (
    <div className='text-white flex items-center justify-center overflow-hidden relative font-montserrat-bold font-black text-4xl sm:text-6xl md:text-8xl'>
   <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
You can Trust Me with 
</ScrollFloat>


    </div>
  );
};

export default LogoMarquee;

