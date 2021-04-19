import React, { Component } from 'react';

export default class Task extends Component {
    state = {
        hidden: true,
        label: this.props.label
    }
    hide = () => {
        console.log(this.props.onEditing())
        this.setState(({ hidden }) => {
            return {
                hidden: !hidden
            }
        });
    }
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onUpdateLabel(this.state.label);
        this.hide();
    }
    render() {
        const { label, onDeleted, onCompleted } = this.props;
        return(
            <>
                <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label>
                        <span className='description'
                              onClick={ onCompleted }>{ label }</span>
                        <span className='created'>created 5 minutes ago</span>
                    </label>
                    <button className='icon icon-edit'
                            onClick={ this.hide }></button>
                    <button className='icon icon-destroy'
                            onClick={ onDeleted }></button>
                </div>
                <form onSubmit={ this.onSubmit }>
                    <input  type='text'
                            className='edit'
                            value={ this.state.label }
                            onChange={ this.onLabelChange } 
                            hidden/>
                </form>
            </>
        )
    }
}