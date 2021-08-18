import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useAuth } from "src/contexts/AuthorizationContext"

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Sidebar = styled.div`
  min-width: 410px;
  height: 100vh;
  border-right: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SidebarHeader = styled.div`
  min-height: 155px;
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
    user-select: none;
  }

  & h1 {
    font-weight: 500;
    font-size: 36px;
    margin-left: 20px;
  }
`

const ContentHeader = styled.header`
  height: 155px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;

  & h2 {
    margin: 0;
    padding: 0px 40px;
    font-weight: 500;
    font-size: 36px;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
`

const Content = styled.main`
  width: 100%;
  height: calc(100vh - 156px);
  max-height: calc(100vh - 156px);
`

const LinkButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 65px 0px;
`

const SidebarLinkButton = styled(Link)<{ hover: boolean }>`
  transition: all 0.2s ease;
  width: 290px;
  height: 55px;
  margin: 11px;
  border-radius: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${(props) => (props.hover ? "#e1e1e1" : "#ffffff")};
  padding: 0px 19px;
  font-size: 24px;
  font-weight: 500;
  text-decoration: none;
  color: ${(props) => (props.hover ? "#4576BE" : "#6F6F6F")};
  box-shadow: ${(props) =>
    props.hover ? "0px 2px 13px 2px rgba(0, 0, 0, 0.11)" : "none"};

  &:hover {
    ${(props) =>
      !props.hover ? "box-shadow: 0px 2px 13px 2px rgba(0, 0, 0, 0.06);" : ""};
    border: 1px solid #e1e1e1;
  }
`

export type LayoutProps = {
  children?: React.ReactNode
  currentPage: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
}: LayoutProps) => {
  const { username } = useAuth()

  return (
    <ViewWrapper>
      <Sidebar>
        <SidebarHeader>
          <Link to="/">
            <img src={"danboard_logo.svg"} />
            <h1>danboard</h1>
          </Link>
        </SidebarHeader>
        <LinkButtonWrapper>
          <SidebarLinkButton to="/" hover={currentPage === "dashboard"}>
            <Icon icon="ic:baseline-space-dashboard" />
            <p>dashboard</p>
          </SidebarLinkButton>
          <SidebarLinkButton to="/accounts" hover={currentPage === "accounts"}>
            <Icon icon="ic:round-account-balance" />
            <p>accounts</p>
          </SidebarLinkButton>
        </LinkButtonWrapper>
      </Sidebar>
      <ContentWrapper>
        <ContentHeader>
          <h2>welcome, {username}</h2>
        </ContentHeader>
        <Content>{children}</Content>
      </ContentWrapper>
    </ViewWrapper>
  )
}

export default Layout
