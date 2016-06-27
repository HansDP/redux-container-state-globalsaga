import React from 'react'
import { createSagaAction } from './sagaStoreEnhancer'
import { getLocationAction, getModel } from 'redux-container-state/lib/middleware'
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

                        const { dispatch } = this.props
                        let containerLocation
                        dispatch(getLocationAction((location) => containerLocation = location))
                        warning(containerLocation !== undefined, 'Middleware \'containerStateMiddleware\' not installed. Apply this middleware to your Redux store.')

                        this.saga = createSaga({
                            getState: () => {
                                return getModel(containerLocation)
                            },
                            type: (typeName) => containerLocation + '->' + typeName
                        })

                        dispatch(createSagaAction(this.saga))
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