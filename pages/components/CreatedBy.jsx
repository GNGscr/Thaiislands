const CreatedBy = () => {
  
  const handleGoToDeBrand = e => {
      // e.preventDefault(); // Prevent default anchor behavior
      console.log('set animation');
    }
    
    return (
        <a href="https://debrand1-debrand.ekdas8.easypanel.host/"
        // <a href="https://debrand.design.com"
            rel="noopener noreferrer"
            target="_blank"
            className="relative"
            onClick={handleGoToDeBrand}>
        <div className="created-by">
            Created by
            <span
              style={{opacity: 0.8}}
              className="debrand-logo text-[#ff0000] ml-[0.65rem] mr-1 font-bold"
              >
              <span className="text-[#fff]" style={{opacity: 0.9}}>D</span>
              <span className="text-[#c8bdb0]" style={{opacity: 0.9}}>E</span>
              <span className="brand">BRAND</span>
              <span className="text-[#fff] text-[2rem] mb-[0.85rem]">.</span>
              <span className="text-[#c8bdb0]" style={{opacity: 0.9}}>DESIGN</span>
                
              {/* <span className="text-[2rem] ml-[-0.025rem] mt-[0.785rem] text-[#fff]" style={{opacity: 1}}>*</span> */}
              <span className="text-[2.1rem] ml-[0.005rem] mt-[0.875rem] text-[#fff]" style={{opacity: 1}}>*</span>
            </span>

        </div>
      </a>
    )
}

export default CreatedBy;