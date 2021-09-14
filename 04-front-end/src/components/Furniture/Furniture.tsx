import React from 'react';
import FurnitureModel from '../../../../03-back-end/src/components/furniture/model';


interface FurnitureProperties {
    furniture: FurnitureModel
}

export default class Furniture extends React.Component<FurnitureProperties> {
    render() {
        return (
            <div className="furniture">
                <h1>Namestaj</h1>
                <p>Ovo je str namestaja</p> 
            </div>
        )
    }
}