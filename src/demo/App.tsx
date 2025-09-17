import * as React from 'react';
import SimpleKeyboard from '@aac/simple-keyboard';
// import Keyboard from '../../build/index';
import Keyboard from '../lib/components/Keyboard';
import '@aac/simple-keyboard/css';
import './css/App.css';

// Layouts

class App extends React.Component {
  state = {
    input: '',
    layoutName: 'default',
  };

  keyboard!: SimpleKeyboard;

  componentDidMount() {
    document.addEventListener('keydown', this.handleGlobalKeyDown);
  }

  componentDidUpdate(): void {
    if (this.keyboard) {
      this.keyboard.setOptions({ debug: true });
      console.log('[Demo] Keyboard options set', this.keyboard.options);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKeyDown);
  }

  handleGlobalKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F9') {
      this.setState({ activeSurface: 'keyboard' }, () => {
        this.keyboard.setOptions({ activeSurface: 'keyboard' });
        console.log('[KeyboardToggleDemo] activeSurface set to keyboard');
      });
    }
    if (e.key === 'F10') {
      this.setState({ activeSurface: 'editor' }, () => {
        this.keyboard.setOptions({ activeSurface: 'editor' });
        console.log('[KeyboardToggleDemo] activeSurface set to editor');
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
          <textarea className='inputContainer' value={input} onChange={onChangeInput} />
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
        />
      </div>
    );
  }
}

export default App;
