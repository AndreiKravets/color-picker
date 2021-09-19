import React, {useState} from 'react';
import {AiFillCaretDown} from "react-icons/ai";


function ColorPicker(props) {
    const {value, colors, onChange} = props;

    const [currentColor, setCurrentColor] = useState(() => { return value })
    const [prevCurrentColor, setPrevCurrentColor] = useState(() => { return value })
    const [rgbActive, setRgbActive] = useState(false)
    const [paletteActive, setPaletteActive] = useState(false)
    const [rgbRed, setRgbRed] = useState(() => { return parseInt(currentColor.substring(1, 3), 16)})
    const [rgbGreen, setRgbGreen] = useState(() => {return parseInt(currentColor.substring(3, 5), 16)})
    const [rgbBlue, setRgbBlue] = useState(() => {return parseInt(value.substring(5, 7), 16)})

    function convertHexToRgb(e) {
        setRgbRed(parseInt(e.substring(1, 3), 16))
        setRgbGreen(parseInt(e.substring(3, 5), 16))
        setRgbBlue(parseInt(e.substring(5, 7), 16))
    }

    function convertRgbToHex(color) {
        const correctColor = (+color).toString(16)
        if (correctColor.length < 2)
            return "0" + correctColor;
        return correctColor;
    }

    function changeRgbColor(red, green, blue) {
        setCurrentColor('#' + convertRgbToHex(red) + convertRgbToHex(green) + convertRgbToHex(blue))
    }

    return (
        <div className="app" onClick={function () {
            setCurrentColor(prevCurrentColor);
            setPaletteActive(false);
            setRgbActive(false);
            convertHexToRgb(prevCurrentColor)
        }}>
            <div className="color_picker" onClick={e => e.stopPropagation()}>
                <div className="current_color">{currentColor}</div>
                <div className={rgbActive ? "color_rgb active" : "color_rgb"} onClick={() => {
                    setRgbActive(true);
                    setPaletteActive(false);
                    setPrevCurrentColor(currentColor)
                }}>
                    <span style={{backgroundColor: currentColor}}></span>
                    <div className="menu_rgb" onClick={e => e.stopPropagation()}>
                        <div> R <input type="range" min="0" max="255" value={rgbRed} id="red"
                                       onChange={(event) => {
                                           setRgbRed(event.target.value);
                                           changeRgbColor(event.target.value, rgbGreen, rgbBlue)
                                       }}/></div>
                        <div> G <input type="range" min="0" max="255" value={rgbGreen} id="green"
                                       onChange={(event) => {
                                           setRgbGreen(event.target.value);
                                           changeRgbColor(rgbRed, event.target.value, rgbBlue)
                                       }}/></div>
                        <div> B <input type="range" min="0" max="255" value={rgbBlue} id="blue"
                                       onChange={(event) => {
                                           setRgbBlue(event.target.value);
                                           changeRgbColor(rgbRed, rgbGreen, event.target.value)
                                       }}/></div>
                        <div className="btn">
                            <button id="cancel" onClick={function () {
                                setCurrentColor(prevCurrentColor);
                                setRgbActive(false);
                                convertHexToRgb(prevCurrentColor)
                            }}>Cancel
                            </button>
                            <button id="ok" onClick={() => {
                                setRgbActive(false);
                                setPrevCurrentColor(currentColor)
                                onChange(currentColor)
                            }}>Ok
                            </button>
                        </div>
                    </div>
                </div>
                <div className={paletteActive ? "color_palette active" : "color_palette"} onClick={() => {
                    setRgbActive(false);
                    setPaletteActive(true)
                }}>
                    <AiFillCaretDown/>
                    <div className="menu_palette" onClick={e => e.stopPropagation()}>
                        <ul>
                            {colors.map((data, idx) => {
                                return (
                                    <li key={idx}
                                        className={data.color == currentColor ? "active" : ""}
                                        onClick={() => {
                                            setCurrentColor(data.color);
                                            setPaletteActive(false);
                                            setPrevCurrentColor(data.color);
                                            setRgbRed(parseInt(data.color.substring(1, 3), 16))
                                            convertHexToRgb(data.color);
                                            onChange(data.color)
                                        }}>
                                        {data.name}<span style={{backgroundColor: data.color}}></span></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
