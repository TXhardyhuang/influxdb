import React, {PureComponent} from 'react'
import {withRouter, WithRouterProps} from 'react-router'
import {connect} from 'react-redux'

// Components
import ImportOverlay from 'src/shared/components/ImportOverlay'

// Actions
import {createVariableFromTemplate as createVariableFromTemplateAction} from 'src/variables/actions'
import {notify as notifyAction} from 'src/shared/actions/notifications'

// Types
import {AppState, Organization} from 'src/types'

interface DispatchProps {
  createVariableFromTemplate: typeof createVariableFromTemplateAction
  notify: typeof notifyAction
}

interface StateProps {
  org: Organization
}

interface OwnProps extends WithRouterProps {
  params: {orgID: string}
}

type Props = DispatchProps & OwnProps & StateProps

class VariableImportOverlay extends PureComponent<Props> {
  public render() {
    return (
      <ImportOverlay
        onDismissOverlay={this.onDismiss}
        resourceName="Variable"
        onSubmit={this.handleImportVariable}
      />
    )
  }

  private onDismiss = () => {
    const {router} = this.props

    router.goBack()
  }

  private handleImportVariable = () => async (
    uploadContent: string
  ): Promise<void> => {
    const {
      createVariableFromTemplate,
      params: {orgID},
    } = this.props

    const template = JSON.parse(uploadContent)
    await createVariableFromTemplate(template, orgID)

    this.onDismiss()
  }
}

const mstp = (state: AppState, props: Props): StateProps => {
  const {orgs} = state

  const org = orgs.find(o => o.id === props.params.orgID)

  return {org}
}

const mdtp: DispatchProps = {
  notify: notifyAction,
  createVariableFromTemplate: createVariableFromTemplateAction,
}

export default connect<StateProps, DispatchProps, Props>(
  mstp,
  mdtp
)(withRouter(VariableImportOverlay))
