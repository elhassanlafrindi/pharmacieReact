import styled from 'styled-components';

export const Containert = styled.div`
 border-radius: 10px;
 box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
 position: relative;
 overflow: hidden;
 width: 678px;
 max-width: 100%;
 min-height: 400px;
`;

export const SignUpContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 opacity: 0;
 z-index: 1;
 ${props => props.whorole !== "true" ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 ` 
 : null}
`;

export const SignInContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 z-index: 2;
 ${props => (props.whorole !== "true" ? `transform: translateX(100%);` : null)}
`;

export const Formt = styled.form`
 background-color: #ffffff;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 20px 20px 20px 20px;
 height: 100%;
 text-align: center;
`;

export const Titlet = styled.h5`
 font-weight: bold;
 margin: 0;
 color: #42724b;
`;

export const Inputt = styled.input`
 background-color: #eee;
 border: none;
 padding: 8px 10px;
 margin: 8px 0;
 width: 80%;
 border-radius: 20px;
`;

export const Imgt = styled.img`
 width: 120px;
 height: 120px; 
 margin-bottom: 5px; 
 display: block; 
 margin-left: auto; 
 margin-right: auto;
`;

export const Buttont = styled.button`
 border-radius: 20px;
 border: 1px solid #ff4b2b;
 background-color: #239f85;
 color: #ffffff;
 font-size: 12px;
 font-weight: bold;
 padding: 12px 45px;
 letter-spacing: 1px;
 text-transform: uppercase;
 transition: transform 80ms ease-in;
 &:active {
     transform: scale(0.95);
 }
 &:focus {
     outline: none;
 }
`;

export const GhostButton = styled(Buttont)`
 background-color: transparent;
 border-color: #ffffff;
`;

export const OverlayContainer = styled.div`
 position: absolute;
 top: 0;
 left: 50%;
 width: 50%;
 height: 100%;
 overflow: hidden;
 transition: transform 0.6s ease-in-out;
 z-index: 100;
 ${props => props.whorole !== "true" ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
 background: #4df7d2;
 background: -webkit-linear-gradient(to right, #239f85, #4df7d2);
 background: linear-gradient(to right, #239f85, #4df7d2);
 background-repeat: no-repeat;
 background-size: cover;
 background-position: 0 0;
 color: #ffffff;
 position: relative;
 left: -100%;
 height: 100%;
 width: 200%;
 transform: translateX(0);
 transition: transform 0.6s ease-in-out;
 ${props => (props.whorole !== "true" ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 0 40px;
 text-align: center;
 top: 0;
 height: 100%;
 width: 50%;
 transform: translateX(0);
 transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
 transform: translateX(-20%);
 ${props => props.whorole !== "true" ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
 right: 0;
 transform: translateX(0);
 ${props => props.whorole !== "true" ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
 font-size: 14px;
 font-weight: 100;
 line-height: 20px;
 letter-spacing: 0.5px;
 margin: 20px 0 30px;
`;
export const Message = styled.pre`
 font-size: 8px;
 font-weight: 60;
 line-height: 15px;
 letter-spacing: 0.5px;
 margin: 20px 0 30px;
 color:red;
`;
