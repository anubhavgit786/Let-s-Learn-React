import React, { useState } from 'react'

const CompanyItem = ({ company, defaultVisibility }) => 
{
  const [isVisible, setIsVisisble] = useState(defaultVisibility);
  
  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

export default CompanyItem;