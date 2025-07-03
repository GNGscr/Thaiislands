const CreatedBy = () => {
  
    
    return (
        <a href={`https://debrand-design.vercel.app/`}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Portfolio"
            className="relative">
        <div className="created-by">
            Created by
            <span
              style={{opacity: 0.8}}
              className="debrand-logo text-[#ff0000] ml-[0.65rem] mr-1 font-bold"
              >
              <span className="text-[#fff]" style={{opacity: 0.9}}>D</span>
              <span className="text-[#c8bdb0]" style={{opacity: 0.9}}>E</span>
              <span className="brand">BRAND</span>
              <span className="dot text-[#fff] text-[2rem] mb-[0.85rem]">.</span>
              <span className="text-[#c8bdb0]" style={{opacity: 0.9}}>DESIGN</span>
                
              <span className="text-[2.1rem] ml-[0.005rem] mt-[0.875rem] text-[#fff]" style={{opacity: 1}}>*</span>
            </span>

        </div>
      </a>
    )
}

export default CreatedBy;