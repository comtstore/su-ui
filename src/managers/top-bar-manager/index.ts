class TopBarManager {
    static instance: TopBarManager

    public static getInstance(){
        if(!TopBarManager.instance){
            TopBarManager.instance = new TopBarManager()
        }
        return TopBarManager.instance
    }
}

export default TopBarManager