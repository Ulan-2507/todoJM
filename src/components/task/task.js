import React, { Component } from 'react';



export default class Task extends Component {

    render() {
        let { label, onDeleted, onCompleted } = this.props;
        
        return (
            <>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description"
                              onClick={ onCompleted } > { label } </span>
                        <span className="created">created 17 seconds ago </span>
                    </label>
                    <button className="icon icon-edit" />
                    <button className="icon icon-destroy" 
                            onClick={ onDeleted }/>
                </div>
                <input type="text" className="edit" value={ label } hidden/>  
            </>
        );
    }
    
};
