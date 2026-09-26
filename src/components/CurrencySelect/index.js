import React, { useState } from 'react'
import styled from 'styled-components'

import { useCurrentCurrency } from '../../contexts/Application'

import Row from '../Row'
import { ChevronDown as Arrow } from 'react-feather'

const Select = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 38px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 40em) {
    display: none;
  }
`

const ArrowStyled = styled(Arrow)`
  height: 20px;
  width: 20px;
  margin-left: 6px;
`

const Option = styled(Row)`
  position: absolute;
  top: 40px;
`

const CurrencySelect = () => {
  const [showDropdown, toggleDropdown] = useState(false)
  const [currency, toggleCurrency] = useCurrentCurrency()

  // Helper to determine the other currency based on current selection
  const getOther = () => {
    if (currency === 'USD') {
      return 'ETH'
    } else if (currency === 'ETH') {
      return 'USD'
    }
    // Default fallback assumes binary state or handles multi-token if needed
    return currency === 'USD' ? 'ETH' : 'USD'
  }

  return (
    <>
      <Select>
        <Row onClick={() => toggleDropdown(!showDropdown)}>
          {currency} <ArrowStyled />
        </Row>
        {showDropdown && (
          <Option
            onClick={() => {
              toggleDropdown(!showDropdown)
              // toggleCurrency() typically swaps the internal state or accepts a new value
              // Ensure we pass the new currency if the context expects it, otherwise it toggles
              toggleCurrency(getOther())
            }}
          >
            {getOther()}
          </Option>
        )}
      </Select>
    </>
  )
}

export default CurrencySelect