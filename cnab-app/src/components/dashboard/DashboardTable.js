import { DashboardTableData } from "./DashboardTableData"
import { DashboardTableHeader } from "./DashboardTableHeader"
import { DashboardTableRow } from "./DashboardTableRow"

export const DashboardTable = (props) => {
    const { headerKeys } = props;
    const headerElements = headerKeys.map((headerKey, i) => <DashboardTableHeader content={headerKey} key={i} />)
    const footerElement = <DashboardTableHeader content={`Total: R$${props.total}`} />;
    const dataRowsComponents = [];
    props.documents.forEach((document, i) => {
        const dataElements = [
            <DashboardTableData content={document.shopName} key={`${document.shopName} + ${i}`} />,
            <DashboardTableData content={document.shopOwner} key={`${document.shopOwner + i}+${i}`} />,
            <DashboardTableData content={document.card} key={`${document.card + i}+${i}`} />,
            <DashboardTableData content={document.CPF} key={`${document.CPF + i}+${i}`} />,
            <DashboardTableData content={document.ocurrenceDate} key={`${document.ocurrenceDate + i}+${i}`} />,
            <DashboardTableData content={document.hour} key={`${document.hour + i}+${i}`} />,
            <DashboardTableData content={document.value} key={`${document.value + i}+${i}`} />]
        dataRowsComponents.push(<DashboardTableRow content={dataElements} key={i + 1} />);
    });
    return <table>
        <tbody>
            <DashboardTableRow content={headerElements} key={0} />
            {dataRowsComponents}
        </tbody>
        <tfoot>
            <DashboardTableRow content={footerElement} />
        </tfoot>
    </table>
}