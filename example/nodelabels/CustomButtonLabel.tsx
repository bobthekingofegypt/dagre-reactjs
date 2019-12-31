import * as React from "react";

type CustomButtonLabelProps = {
  title: string;
  description: string;
  onButtonClicked: () => void;
}

export const CustomButtonLabel: React.FC<CustomButtonLabelProps> = ({title, description, onButtonClicked}) => {
  return (
    <div style={{ padding: "10px", border: "2px solid #000", width: "180px"}}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        { title }
      </div>
      <div>
        { description }
      </div>
      <div>
        <button onClick={onButtonClicked}>Details</button>
      </div>
    </div>
  );
}
