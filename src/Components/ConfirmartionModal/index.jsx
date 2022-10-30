import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'

import { GrFormClose } from 'react-icons/gr'

import {
  ModalContainer,
  ModalBox,
  ModalBoxBack,
  ModalCloseButtonBox,
  ModalContentContainer,
  ModalOptionButtonsBox,
  InputModal,
} from './style'

export default function ModalConfirmartion(props) {
  const [input, setInput] = useState('')

  const handleOnChange = (event) => {
    switch (event.target.name) {
      case 'inputParam':
        setInput(event.target.value)
        break
      default:
        break
    }
  }

  const handleActiveModal = () => {
    props.callbackStatus()
    props.callbackModal()
  }

  const handleOnClickConfirm = async (callback) => {
    if (props.haveInput) {
      await callback(input)
    } else {
      await callback()
    }

    handleActiveModal()
  }

  const handleOnClickDenied = async (callback) => {
    await callback()
    handleActiveModal()
  }

  return (
    <ModalContainer active={props.status}>
      <ModalBox>
        <ModalBoxBack>
          <ModalCloseButtonBox onClick={() => handleActiveModal()}>
            <button>
              <GrFormClose />
            </button>
          </ModalCloseButtonBox>
          <div>
            <ModalContentContainer>
              <div>
                <h2>{props.message}</h2>
                {props.haveInput === true && (
                  <InputModal>
                    <Input
                      name='inputParam'
                      placeholder={props.placeholderInput}
                      type='text'
                      onChange={handleOnChange}
                      value={input}
                    />
                  </InputModal>
                )}
              </div>
              <ModalOptionButtonsBox>
                <Button
                  name={props.textButtonConfirm}
                  onclick={() => handleOnClickConfirm(props.onClickConfirm)}
                  gradient
                />
                <Button
                  name={props.textButtonDenied}
                  onclick={() => handleOnClickDenied(props.onClickDenied)}
                  gradient
                />
              </ModalOptionButtonsBox>
            </ModalContentContainer>
          </div>
        </ModalBoxBack>
      </ModalBox>
    </ModalContainer>
  )
}
