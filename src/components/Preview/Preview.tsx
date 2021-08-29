import React, { createElement } from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store/store';

const getNodes = (str: string) =>
  new DOMParser().parseFromString(str, "text/html").body.childNodes;

let createJSX = (nodeArray: any) => {
  return nodeArray.map((node: any) => {
    let attributeObj: any = {};
    const { attributes, localName, childNodes, nodeValue } = node;

    if (attributes) {
      Array.from(attributes).forEach(attribute => {
        if ((attribute as any).name === "style") {
          let styleAttributes = (attribute as any).nodeValue.split(";");
          let styleObj: any = {};
          styleAttributes.forEach((attribute: any) => {
            let [key, value] = attribute.split(":");
            styleObj[key] = value;
          });
          attributeObj[(attribute as any).name] = styleObj;
        } else {
          attributeObj[(attribute as any).name] = (attribute as any).nodeValue;
        }
      });
    }

    return localName
      ? createElement(
        localName,
        attributeObj,
        childNodes && Array.isArray(Array.from(childNodes))
          ? createJSX(Array.from(childNodes))
          : []
      )
      : nodeValue;
  });
};


const Preview: any = observer(() => {
  const { code } = store;

  return (
    <div>
      {createJSX(Array.from(getNodes(code)))}
    </div>
  );
});

export default Preview;
