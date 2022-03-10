import DashboardService from "../../services/DashboardService";
import { Component } from 'react'
import { DashboardTable } from "./DashboardTable";
import { Link } from 'react-router-dom';
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.service = new DashboardService();
        this.state = { shopList: [], documents: [], totalBalance: 0, selectValue: '' }
        this.headerKeys = [
            "Shop Name",
            "Seller Name",
            "Seller Identity",
            "Card",
            "Ocurrence Date",
            "Hour",
            "Value"
        ]

        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        const shopList = await this.service.getGroupedDocs();
        const result = await this.service.getSingleCompanyDocs(shopList[0]);
        this.setState(prevState => ({
            shopList: shopList,
            documents: result.documents,
            selectValue: shopList[0].shopName,
            totalBalance: result.totalBalance
        }))
    }

    async onChange(e) {
        const newResult = await this.service.getSingleCompanyDocs({ shopName: e.target.value });
        this.setState(prevState => ({
            documents: newResult.documents,
            selectValue: e.target.value,
            totalBalance: newResult.totalBalance
        }))
    }

    render() {
        return <div className="dashboard-container">
            <h2>Dashboard</h2>
            <select id="shopList" onChange={this.onChange}>
                {
                    this.state.shopList.map((shopItem, i) => <option value={shopItem.shopName} key={i}>{shopItem.shopName}</option>)
                }
            </select>
            <DashboardTable documents={this.state.documents} headerKeys={this.headerKeys} total={this.state.totalBalance.toFixed(2)} />
            <Link to="/dashboard/file" className='link'>File Uploader</Link>
        </div>;
    }
}

export default Dashboard;