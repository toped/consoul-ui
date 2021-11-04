
import styled from 'styled-components'

const MemeFrame = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.text};
	padding: 4px;
	margin: 2rem 1rem;
  border-radius: 4px;

	img {
    width: 100%;
    border-radius: 4px;

    /* The animation code */
    @keyframes example {
      from {
        filter: blur(8px);
      }
      to {
        filter: blur(0px);
      }
    }
      filter: blur(18px);
      animation-name: example;
      animation-fill-mode: forwards;
      animation-duration: .6s;
      animation-delay: 1s;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) { 
    /* width: 300px; */
	}
`
export default MemeFrame