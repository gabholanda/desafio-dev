export const DashboardTableRow = (props) => {
    const rowContentComponent = props.content;
    return <tr>
        {rowContentComponent}
    </tr>
}