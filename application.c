#include <application.h>

#define TEN_MINUTES_IN_MS (10 * 60 * 1000)
#define MAX_MESSAGES 10

static int received_values[MAX_MESSAGES];
static int num_messages = 0;

float battery_voltage_value = 0;
int battery_percentage_value = 0;

int button_click = 0; // '.' dot
int button_hold = 1;  // '-' dash

twr_led_t led;
twr_button_t button;

// declaration of the blink out morse code function
void blink_out_morse_code(uint64_t *id, const char *topic, void *value, void *param);

// radio subscribe function
static const twr_radio_sub_t subs[] = {
    {"cheatsheet/help/-/set",
     TWR_RADIO_SUB_PT_INT,
     blink_out_morse_code, NULL}};

// initialization of blink out morse code function, that blinks out long or short signals from the subscribed topic
void blink_out_morse_code(uint64_t *id, const char *topic, void *value, void *param)
{
    if (num_messages < MAX_MESSAGES)
    {
        received_values[num_messages] = *((int *)value);
        num_messages++;
    }

    for (int i = 0; i < num_messages; i++)
    {

        if (received_values[i] == 1)
        {
            twr_led_pulse(&led, 1000);
        }
        else if (received_values[i] == 0)
        {
            twr_led_pulse(&led, 300);
        }
    }
    memset(received_values, 0, sizeof(received_values));
    num_messages = 0;
}

// function that categorizes holds as "-" and clicks as "." + blinking of the led upon interaction
void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    if (event == TWR_BUTTON_EVENT_PRESS)
    {
        twr_led_set_mode(&led, TWR_LED_MODE_ON);
    }
    else if (event == TWR_BUTTON_EVENT_RELEASE)
    {
        twr_led_set_mode(&led, TWR_LED_MODE_OFF);
    }
    else if (event == TWR_BUTTON_EVENT_CLICK)
    {

        twr_log_info("click %d", button_click);
        twr_radio_pub_push_button(&button_click);
    }
    else if (event == TWR_BUTTON_EVENT_HOLD)
    {

        twr_log_info("hold %d", button_hold);

        twr_radio_pub_push_button(&button_hold);
    }
}

// function that manages and informs the gateway about the state of the core module's battery
void battery_event_handler(twr_module_battery_event_t event, void *event_param)
{
    if (event == TWR_MODULE_BATTERY_EVENT_UPDATE)
    {
        float voltage;
        int percentage;
        if (twr_module_battery_get_voltage(&voltage) && twr_module_battery_get_charge_level(&percentage))
        {
            battery_voltage_value = voltage;
            battery_percentage_value = percentage;
        }
        twr_radio_pub_int("battery/-/percentage", &battery_percentage_value);

        if ((battery_percentage_value) <= 50 && (battery_percentage_value) > 20)
        {
            twr_log_info("Battery: %d% ", battery_percentage_value);

            twr_radio_pub_string("battery/percentage/mid", "INFO");
        }
        if ((battery_percentage_value) <= 20 && (battery_percentage_value) > 10)
        {
            twr_log_warning("WARNING Battery: %d", battery_percentage_value);

            twr_radio_pub_string("battery/percentage/low", "WARNING");
        }
        if ((battery_percentage_value) <= 10)
        {
            twr_log_error("CRITICAL WARNING Battery: %d%", battery_percentage_value);

            twr_radio_pub_string("battery/percentage/critical", "CRITICAL");
        }
    }
}

void application_init(void)
{
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);
    twr_log_info("APPLICATION START");

    twr_led_init(&led, TWR_GPIO_LED, false, 0);
    twr_led_pulse(&led, 2000);

    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
    // twr_radio_set_rx_timeout_for_sleeping_node(1000);

    twr_radio_set_subs((twr_radio_sub_t *)subs, sizeof(subs) / sizeof(twr_radio_sub_t));

    twr_radio_pairing_request("push-button", "blockly_dev");

    twr_module_battery_init();
    twr_module_battery_set_event_handler(battery_event_handler, NULL);
    twr_module_battery_set_update_interval(TEN_MINUTES_IN_MS);
}
