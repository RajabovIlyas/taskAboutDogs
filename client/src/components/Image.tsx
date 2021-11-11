import React, {FC} from "react";

export const Image:FC<string> = (src) => {
    return (<img src={src} width={100}/>);
}
export default Image
