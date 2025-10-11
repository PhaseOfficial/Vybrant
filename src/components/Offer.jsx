import React from "react";
import CurvedLoop from './CurvedLoop'

const Offer = () => {
  return (
    <section className="mb-20">
      <div>
  <CurvedLoop 
  marqueeText="This ✦ Is ✦ My ✦ Portfolio ✦ Enjoy ✦"
  speed={3}
  curveAmount={500}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>
      </div>
    </section>
  );
};

export default Offer;
