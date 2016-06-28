import React from 'react'
import { createSagaAction } from './sagaStoreEnhancer'
import { getLocationAction, getModel } from 'redux-container-state/lib/modelRepository'
import warning from 'warning'

const emptyData = {}

export default (createSaga, options) => {

	options = {
		autoCancel: true,
		onMount: (props) => { },
		...options
	}

    return (next) => {

        return (View) => {

            return next(class SagaView extends React.Component {

                componentDidMount() {
                    if (createSaga) {

                        const { localDispatch } = this.props

                        const containerLocation = localDispatch({ type: '@@GET_FULL_NAME', isNameLookup: true })

                        this.saga = createSaga({
                            getState: () => {
                                return getModel(containerLocation)
                            },
                            type: (typeName) => containerLocation + '->' + typeName
                        })

                        localDispatch(createSagaAction(this.saga))
                    }

                    if (options.onMount) {
                    	options.onMount(this.props)
                    }
                }

                componentWillUnmount() {
                	if (this.saga && options.autoCancel) {
	                	this.saga.cancel()
                	}
                    this.saga = null
                }

                render() {
                    return React.createElement(View, this.props)
                }
            })
        }
    }
}