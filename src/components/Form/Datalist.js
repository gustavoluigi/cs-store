/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Label from './Label';

export const Wrapper = styled.div`
  ${tw`relative mb-6 z-10 focus-within:z-50`}
`;

export const InputStyled = styled.input`
  ${tw`block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black`}
`;

export const LabelStyled = styled(Label)`
  ${tw`z-20`}
`;

export const CreatableSelectStyled = styled(CreatableSelect)`
  .react-select__value-container {
    ${tw`w-full mt-0 px-4 py-4 text-base placeholder-gray-400 bg-white rounded-md focus:outline-none focus:border-black`}
  }

  .react-select__control {
    ${tw`border border-gray-300 rounded`}
  }

  .react-select__control {
    ${tw`group-hover:z-10`}
  }

  .react-select__indicator-separator {
    ${tw`first:hidden`}
  }
`;
export const SelectStyled = styled(Select)`
  .react-select__value-container {
    ${tw`w-full mt-0 px-4 py-4 text-base placeholder-gray-400 bg-white rounded-md focus:outline-none focus:border-black`}
  }

  .react-select__control {
    ${tw`border border-gray-300 rounded`}
  }

  .react-select__control {
    ${tw`group-hover:z-10`}
  }

  .react-select__indicator-separator {
    ${tw`first:hidden`}
  }
`;

function Datalist({
  label, options, list, creatable, ...props
}) {
  return (
    <Wrapper className="group">
      <LabelStyled>{label}</LabelStyled>
      {creatable && <CreatableSelectStyled options={options} classNamePrefix="react-select" {...props} />}
      {!creatable && <SelectStyled options={options} classNamePrefix="react-select" {...props} />}
    </Wrapper>
  );
}

export default Datalist;

Datalist.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ).isRequired,
  creatable: PropTypes.bool,
  props: PropTypes.object,
};

Datalist.defaultProps = {
  creatable: true,
  props: {},
};
