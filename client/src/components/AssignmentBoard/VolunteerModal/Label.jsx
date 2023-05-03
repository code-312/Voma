const Label = ({labelStyle, nameStyle, labelName, colors}) => {

  if (!labelName) return null

  return (
    <div className={labelStyle}>
      <div className={nameStyle} style={{color: colors.color, background: colors.background}}>{labelName}</div>
    </div>
  )
}

export default Label