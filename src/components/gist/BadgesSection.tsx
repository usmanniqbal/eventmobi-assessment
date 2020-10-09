import React from "react";
import js from '../../assets/logos/js.png'
import py from '../../assets/logos/py.png'
import ts from '../../assets/logos/ts.png'
import unknown from '../../assets/logos/unknown.png'

export interface IBadgeProps {
  files: { [key: string]: any };
}

const BadgesSection = (props: IBadgeProps) => {
  const { files } = props;
  const icons: { [key: string]: string } = {
    js,
    jsx: js,
    py,
    ts,
    unknown
  };

  return (
    <td>
      <div className="inline-img">
        {
          Object.keys(files).map((file, i) => <img key={i} height="50px" width="50px" alt="" src={icons[file.split('.').pop() ?? ''] ?? icons.unknown} />)
        }
      </div>
    </td>
  );
};

export default BadgesSection;
