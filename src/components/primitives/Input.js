import React from 'react'
import styled from 'styled-components'
import { InputGroup as BPInputGroup } from '@blueprintjs/core'

const InputGroup = styled(BPInputGroup)`
  &&& {
    .bp3-icon {
      color: ${({theme}) => theme.primary};
      display: flex;
      align-items: center;
      height: 66%;
    }

    .bp3-input-action {
      display: flex;
      height: 100%;
    }

    &.bp3-disabled {
      opacity: .75 !important;
    }

    .bp3-input {
      color: ${({theme}) => theme.name === 'light' ? theme.trueBlack : theme.trueWhite};
      border-radius: 2px;
      border-width: 1px;
      border-style: solid;
      border-color: ${({theme}) => theme.name === 'light' ? 'rgba(16, 22, 26, 0.15)' : 'rgba(255, 255, 255, 0.5)'} !important;
      background: ${({theme}) => theme.name === 'dark' ? 'rgba(16, 22, 26, 0.15)' : 'rgba(255, 255, 255, 0.5)'};
      
      box-shadow: none;
      font-size: 12px;

      &::placeholder {
        color: ${({theme}) => theme.name === 'light' ? theme.trueBlack : theme.trueWhite};
        opacity: .6;
      }

      &:disabled {
        background: inherit;
      }
    }
  }
`

const _ = (props) => <InputGroup {...props} />
_.propTypes = {

}

export default _
