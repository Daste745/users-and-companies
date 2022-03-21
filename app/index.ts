import "./styles/styles.scss";
import { Company, fetchCompanies } from "./company";
import { User, fetchUsers } from "./user";
import { getTemplate, cloneTemplate, setElementText } from "./util";

function populateUserList(users: User[], listElement: Element): void {
  const userTemplate = getTemplate("user");

  for (const user of users) {
    const userCard = cloneTemplate(userTemplate);

    setElementText(".name", user.name, userCard);
    setElementText(".email", user.email, userCard);

    listElement.appendChild(userCard);
  }
}

function populateCompanyList(companies: Company[]): void {
  companies.sort((a, b) => a.users.length - b.users.length);

  const companiesList = document.querySelector(".companies");
  const companyTemplate = getTemplate("company");

  for (const company of companies) {
    const companyCard = cloneTemplate(companyTemplate);

    setElementText(".name", company.name, companyCard);
    setElementText(".user-count", company.users.length, companyCard);

    const expandButton = companyCard.querySelector(".expand");
    const usersList = companyCard.querySelector(".users");

    populateUserList(company.users, usersList);

    expandButton.addEventListener("click", () => {
      expandButton.classList.toggle("expanded");
      usersList.classList.toggle("hidden");
    });

    companiesList.appendChild(companyCard);
  }
}

window.onload = async function onLoad() {
  const users = await fetchUsers();
  const companies = await fetchCompanies();
  companies.sort((a, b) => a.id - b.id);

  for (const user of users) {
    companies[user.companyId].addUser(user);
  }

  populateCompanyList(companies);
};
