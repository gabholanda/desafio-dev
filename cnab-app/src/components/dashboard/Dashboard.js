import DashboardService from "../../services/DashboardService";
import { Component } from 'react'
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.service = new DashboardService();
        this.state = { shopList: [], documents: [], totalBalance: 0 }
    }

    async componentDidMount() {
        const shopList = await this.service.getGroupedDocs();
        const result = await this.service.getSingleCompanyDocs(shopList[0]);
        this.setState({ shopList, ...result });
    }

    render() {
        return <h1>Hello Dashboard</h1>;
    }
}

export default Dashboard;