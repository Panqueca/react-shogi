import React from 'react'
import PropTypes from 'prop-types'
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import useStyles from './useStyles'

const Container = ({
  children,
  backgroundColor,
  percentage,
  containerStyle = {},
  contentStyle = {},
}) => {
  const styles = useStyles({ backgroundColor, percentage })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...styles.container, containerStyle }}>
        <View style={{ ...styles.content, contentStyle }}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  )
}

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
