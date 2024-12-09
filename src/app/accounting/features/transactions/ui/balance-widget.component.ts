import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../common/icons/svg-icon.component';

@Component({
    selector: 'balance-widget',
    template: `
       <article class="balance">
        <section>
            <label>Balance</label>
            <div>{{ balance() | currency:'USD':'symbol':'1.2-2' }}</div>
        </section>
        <footer>
            <section>
                <label><svg-icon name="arrow-up" class="up"/>Income</label>
                <div>{{ income() | currency:'USD':'symbol':'1.2-2' }}</div>
            </section>
            <section>
                <label><svg-icon name="arrow-down" class="down"/>Expense</label>
                <div>{{ expense() | currency:'USD':'symbol':'1.2-2' }}</div>
            </section>
        </footer>
    </article>
    `,
    styles:[`
        @use 'index';
        :host {
            .balance {
                border-radius: index.$border-radius;;
                background: #FFF;
                box-shadow: 0px 20px 50px 1px rgba(64, 72, 82, 0.10);

                display: flex;
                padding: 32px;
                flex-direction: column;
                align-items: flex-start;
                gap: 32px;
                width: 400px;

                section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    label {
                        display: flex;
                        align-items: center;
                        color: index.$black-100;

                        font-size: 24px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 32px;

                        .up {
                            fill: index.$green;
                        }

                        .down {
                            fill: index.$orange;
                        }
                    }

                    div {
                        color: index.$black-100;
                        font-size: 22px;
                    }
                }
                footer {
                    display: flex; 
                    justify-content: space-between;
                    width: 100%;
                }
            }
        }
    `],
    imports: [
        CurrencyPipe,
        SvgIconComponent
    ]
})
export class BalanceWidgetComponent {

    income = input<number>()
    expense = input<number>()
    balance = input<number>()

}
