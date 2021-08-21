import { InlineIcon } from "@iconify/react"
import styled from "styled-components"
import React from "react"

export type DashboardItemTagProps = {
  icon: string
  text?: string
  color: string
  iconTransform?: string
}

const Tag = styled.span<{ color: string; iconTransform: string | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-size: 14px;
  border-radius: 30px;
  max-height: 30px;
  padding: 0px 8px;
  color: ${(props) => props.color};
  background-color: #f5f5f5;
  font-weight: 600;

  & > svg {
    height: 20px;
    width: 20px;
    transform: ${(props) =>
      props.iconTransform ? props.iconTransform : "none"};
  }
`

const DashboardItemTag: React.FC<DashboardItemTagProps> = (
  props: DashboardItemTagProps
) => {
  return (
    <Tag color={props.color} iconTransform={props.iconTransform}>
      {props.text && <p>{props.text}</p>}
      <InlineIcon icon={props.icon} />
    </Tag>
  )
}

export default DashboardItemTag
