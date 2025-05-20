import * as React from 'react';
import SimpleKeyboard from 'simple-keyboard';
import Keyboard from '../../build/index';
import 'simple-keyboard/css';
import './css/App.css';

// Layouts
import layout from 'simple-keyboard-layouts/build/layouts/korean';

class App extends React.Component {
  state = {
    input: '',
    layoutName: 'default',
  };

  keyboard: SimpleKeyboard;

  onChange = (input) => this.setState({ input }, () => console.log('Input changed', input));

  onKeyPress = (button) => {
    /**
     * Shift functionality
     */
    if (['{capslock}', '{shiftleft}', '{shiftright}'].includes(button)) this.handleShiftButton();
  };

  handleShiftButton = () => {
    const {
      state: { layoutName },
    } = this;
    const shiftToggle = layoutName === 'default' ? 'shift' : 'default';

    this.setState({ layoutName: shiftToggle });
  };

  onChangeInput = (event) => {
    const input = event.target.value;

    this.setState({ input: event.target.value }, () => this.keyboard.setInput(input));
  };

  render() {
    const {
      state: { input, layoutName },
      onChangeInput,
      onChange,
      onKeyPress,
    } = this;

    return (
      <div className='demoPage'>
        <div className='screenContainer'>
          <textarea className='inputContainer' value={input} onChange={onChangeInput} />
        </div>
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layoutName={layoutName}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          excludeFromLayout={{
            default: ['@', '.com'],
            shift: ['@', '.com'],
          }}
          debug={true}
        />
      </div>
    );
  }
}

export default App;
