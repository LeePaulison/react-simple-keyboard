import * as React from 'react';
import SimpleKeyboard from '@aac/simple-keyboard';
// import Keyboard from '../../build/index';
import Keyboard from '../lib/components/Keyboard';
import '@aac/simple-keyboard/css';
import './css/App.css';

// Layouts

class App extends React.Component {
  state: {
    input: string;
    layoutName: string;
    isRoving: boolean;
    activeSurface: 'editor' | 'keyboard' | 'none';
  } = {
    input: '',
    layoutName: 'default',
    isRoving: false,
    activeSurface: 'editor', // editor | keyboard | none
  };

  keyboard!: SimpleKeyboard;

  componentDidMount() {
    document.addEventListener('keydown', this.handleGlobalKeyDown);
  }

  componentDidUpdate(): void {
    console.log('[Demo] Component did update activeSurface', this.state.activeSurface);
    if (this.keyboard) {
      this.keyboard.setOptions({ ...this.keyboard.options, activeSurface: this.state.activeSurface });
      console.log('[Demo] Keyboard options set', this.keyboard.options);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKeyDown);
  }

  handleGlobalKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F9') {
      this.setState({ activeSurface: 'keyboard' }, () => {
        this.keyboard.enableRoving();
        console.log('[KeyboardToggleDemo] hard Enabled roving');
      });
    }
    if (e.key === 'F10') {
      this.setState({ activeSurface: 'editor' }, () => {
        this.keyboard.disableRoving();
        console.log('[KeyboardToggleDemo] hard Disabled rovings');
      });
    }
  };

  onChange = (input: string) =>
    this.setState({ input }, () => {
      console.log('Input changed', input);
      this.keyboard.setInput(input, '_focusRestore');
    });

  onKeyPress = (button: string) => {
    console.log('Button pressed', button);
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

  onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <textarea className='inputContainer' value={input} onChange={onChangeInput} placeholder='Type here...' />
          <p className='instructions'>
            <strong>F9</strong>: Switch to Keyboard, <strong>F10</strong>: Switch to Editor
          </p>
          <p className='instructions'>{this.state.isRoving ? 'Roving is ON' : 'Roving is OFF'}</p>
        </div>
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layoutName={layoutName}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          physicalKeyboardHighlightPreventDefault={true}
          excludeFromLayout={{
            default: ['@', '.com'],
            shift: ['@', '.com'],
          }}
          preventMouseDownDefault={true}
          autoFocus={true}
          restoreFocusOnChange='content'
          newLineOnEnter={true}
          onRovingToggle={(isRoving: boolean) => this.setState({ isRoving })}
          debug={true}
        />
      </div>
    );
  }
}

export default App;
