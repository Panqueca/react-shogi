import React from 'react'
import styled from 'styled-components'

const Check = styled.div`
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #f56060;
  font-weight: bold;
  font-size: 24px;
  border-radius: 4px;
  text-align: center;
`

const CheckEffect = ({ text }) => {
  return <Check>{text}</Check>
}

export default CheckEffect
