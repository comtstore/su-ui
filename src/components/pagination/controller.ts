import { baseController } from "../../common/common.interface";
import { PaginationProps } from "./interface";

class PaginationController extends baseController<PaginationProps> {
  public constructor(props: PaginationProps) {
    super(props);
  }

  public changePage = (e, page) => {
    this.props.onChange(e, page);
  };

  public turnToBeforePage = (e) => {
    if (this.props.page > 1) {
      this.changePage(e, this.props.page - 1);
    }
  };

  public turnToNextPage = (e) => {
    if (this.props.page < Math.ceil(this.props.num / this.props.limit)) {
      this.changePage(e, this.props.page + 1);
    }
  };
}

export default PaginationController;
